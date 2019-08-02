import React, { Component, Fragment } from 'react';
import Slider from "react-slick";
import PostService from '../../services/posts-service';
import Posts from '../Posts';

class LatestProducts extends Component {
    static service = new PostService();
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            try {
                    const posts = await LatestProducts.service.getPosts();
                    this.setState({ posts });
                } catch (error) {
                    console.log(error);
            }
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        const settings = {
            dots: false,
            arrows: false,
            infinite: true,
            autoplay: true,
            speed: 1000,
            autoplaySpeed: 5000,
            useTransform: true,
            cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
            vertical: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    centerMode: true,
                    slidesToScroll: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 2,
                    centerMode: true,
                    slidesToScroll: 2
                  }
                }
              ]
        };
        const { posts } = this.state;
        
        return(
            <Fragment>
                <div className="card product-latest">
                    <div className="card-header product__header">
                        <h3 className='card-title'>
                            Latest Products
                        </h3>
                    </div>
                    
                    <div className="card-body product__body">
                        <Slider {...settings}>
                            {   
                                posts.map(post => (
                                <Posts key={post._id} {...post} />
                                ))
                            }
                        </Slider>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default LatestProducts;