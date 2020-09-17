import React from 'react';
import {Link} from 'react-router-dom';
import {uploadPost} from '../api/index';
import axios from 'axios';

export default class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagepath: '',
      posttitle: '',
      story: '',
    };
  }
  onValueChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onimageChange = (event) => {
    this.setState({imagepath: event.target.files[0]});
  };

  onFileUpload = () => {
    const formData = new FormData();
    formData.append('myFile', this.state.imagepath, this.state.imagepath.name);
    formData.append('myFile', this.state.imagepath);
    console.log(this.state.imagepath);
    let nn = axios.post('http://localhost:5000/posts/upload', formData);
    console.log(nn);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const {imagepath, posttitle, story} = this.state;
    let shouldSubmit =
      (imagepath !== '' && story !== '') || (posttitle !== '' && story !== '')
        ? true
        : false;
    if (shouldSubmit) {
      const res = await uploadPost(this.state);
      console.log(res);
    }
  };

  render() {
    const inputstyle = {
      display: 'none',
    };
    const labelstyle = {
      cursor: 'pointer',
    };

    return (
      <div className="container my-3">
        <h2 className="text-center my-2 header-color">Add New Blog post</h2>
        <hr className="hr-class" />

        <form
          id="contact-form"
          onSubmit={this.handleSubmit.bind(this)}
          method="POST"
          encType="multipart/form-data"
        >
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-10">
              <div className="card">
                <div className="upload-img">
                  <div className="row justify-content-center">
                    <input
                      type="file"
                      id="getFile"
                      style={inputstyle}
                      name="imagepath"
                      onChange={this.onimageChange}
                    />
                    <label
                      className="col-12"
                      htmlFor="getFile"
                      style={labelstyle}
                    >
                      <p className="text-center">
                        <span className="h2">
                          <i className="fa fa-camera" aria-hidden="true"></i>
                        </span>
                        <br /> Click to upload image
                      </p>
                    </label>
                  </div>
                </div>
                <hr />
                <div className="card-body">
                  <div className="form-group row">
                    <div className="col-sm-4">
                      <label>Title:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="lorem ipsum"
                        name="posttitle"
                        onChange={this.onValueChange}
                        value={this.state.posttitle}
                      />
                    </div>
                  </div>
                  <label>Story</label>
                  <textarea
                    placeholder="Lorem Ipsum Dolor"
                    cols="3"
                    rows="3"
                    className="form-control"
                    name="story"
                    onChange={this.onValueChange}
                    value={this.state.story}
                  ></textarea>
                  <hr />
                  <div className="text-center">
                    <button
                      className="btn btn-primary"
                      onClick={this.handleSubmit}
                    >
                      <i className="fa fa-plus-circle" aria-hidden="true"></i>{' '}
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
