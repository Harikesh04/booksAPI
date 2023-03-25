import Books from "../models/bookModel.js";

class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          title: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryStrCopy = { ...this.queryStr };

    //Removing some fields for category

    const removeFields = ["keyword", "page", "limit", "order"];

    removeFields.forEach((key) => delete queryStrCopy[key]);

    //Filter data as per need
    let queryStr = JSON.stringify(queryStrCopy); 
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr)); 
    return this;
  }
  sort() {
    const queryStrCopy = { ...this.queryStr };

    if (queryStrCopy.order && Number(queryStrCopy.order) === -1) {
      //sorting in dec order

      this.query = this.query.sort({ publishedDate: -1 });
    } else {
      //sorting in increasing order
      this.query = this.query.find().sort({ publishedDate: 1 });
    }
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1; 
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

export default ApiFeatures;
