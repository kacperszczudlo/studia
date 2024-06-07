import React, { Component } from "react";
import PostsTable from "./postsTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            pageSize: 4,
            currentPage: 1,
            sortColumn: { path: 'title', order: 'asc' },
            newPost: {
                title: "",
                text: "",
                image: ""
            }
        };
    }

    componentDidMount() {
        fetch("http://localhost:3001/api/posts",
        {method: "GET",
        headers: {
        'Accept': 'application/json',
        'Content-Type': ' application/json',
        'x-auth-token': localStorage.getItem('token')
        }})
        .then(res => res.json())
        .then(
        (result) => {
        this.setState({
        isLoaded: true,
        items: result
        });
        console.log(result)
        },
        (error) => {
        this.setState({
        isLoaded: true,
        error
        });
        }
        )
    }

    handleAdd = () => {
        const newPost = {
            id: Date.now(),  
            title: this.state.newPost.title,
            text: this.state.newPost.text,
            image: this.state.newPost.image
        };
        const items = [...this.state.items, newPost];
        this.setState({ items, newPost: { title: "", text: "", image: "" } });
    };

    handleDelete = (post) => {
        const posts = this.state.items.filter(p => p.id !== post.id);
        this.setState({ items: posts });
    };

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    handleSort = (path) => {
        const sortColumn = { ...this.state.sortColumn };
        if (sortColumn.path === path) {
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        } else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.setState({ sortColumn });
    };

    handleChange = ({ currentTarget: input }) => {
        const newPost = { ...this.state.newPost };
        newPost[input.name] = input.value;
        this.setState({ newPost });
    };

    renderSortIcon = (column) => {
        if (column !== this.state.sortColumn.path) {
            return null;
        }
        if (this.state.sortColumn.order === 'asc') {
            return <i className="fa fa-sort-asc"></i>;
        }
        if (this.state.sortColumn.order === 'desc') {
            return <i className="fa fa-sort-desc"></i>;
        }
    };

    render() {
        const { items, pageSize, currentPage, sortColumn, newPost } = this.state;

        if (!items.length) {
            return <p>Brak wpisów</p>;
        }

        const sorted = _.orderBy(items, [sortColumn.path], [sortColumn.order]);
        const posts = paginate(sorted, currentPage, pageSize);

        return (
            <React.Fragment>
                <div className="mb-4">
                    <input
                        type="text"
                        name="title"
                        value={newPost.title}
                        onChange={this.handleChange}
                        placeholder="Title"
                        className="form-control mb-2"
                    />
                    <input
                        type="text"
                        name="text"
                        value={newPost.text}
                        onChange={this.handleChange}
                        placeholder="Text"
                        className="form-control mb-2"
                    />
                    <input
                        type="text"
                        name="image"
                        value={newPost.image}
                        onChange={this.handleChange}
                        placeholder="Image URL"
                        className="form-control mb-2"
                    />
                    <button onClick={this.handleAdd} className="btn btn-primary">Add</button>
                </div>
                <PostsTable
                    items={posts}
                    sortIcon={this.renderSortIcon}
                    onDelete={this.handleDelete}
                    onSort={this.handleSort}
                />
                <Pagination
                    itemsCount={items.length}
                    pageSize={this.state.pageSize}
                    currentPage={this.state.currentPage}
                    onPageChange={this.handlePageChange}
                />
            </React.Fragment>
        );
    }
}

export default Posts;
