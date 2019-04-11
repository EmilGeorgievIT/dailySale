import React, { Component } from 'react';
import '../styles/Hero.scss';
import SearchForm from './SearchForm';
import CategoriesList from './CategoriesList';

export default class Hero extends Component {
    render() {
        return (
            <div className='section-hero'>
                <div className="container">
                    <div className="section__head">
                        <SearchForm location='Ireland'/>
                    </div>
                    
                    <div className="section__body">
                        <CategoriesList />
                    </div>
                </div>
            </div>
        );
    }
}