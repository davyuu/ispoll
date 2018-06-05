import React from 'react'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import {Link} from 'react-router-dom'
import routes from '../constants/routes'
import './TopRestaurants.css'

class TopRestaurants extends React.Component {
  render() {
    const {data} = this.props
    if(data.loading) return <p>Loading...</p>

    const {restaurants} = data;

    if(!restaurants) {
      return (
        <p>No Restaurants Found</p>
      )
    }

    return (
      <div className='top-restaurants'>
        {restaurants.sort((a, b) => a.numRatings < b.numRatings)
          .map((restaurant, i) => {
            return (
              <Link
                key={i}
                className='top-restaurant'
                to={`${routes.restaurant}/${restaurant.id}`}
              >
                <div className="top-restaurant-rank">{i+1}</div>
                <div className='top-restaurant-descriptions'>
                  <div className="top-restaurant-name">{restaurant.name}</div>
                  <div className="top-restaurant-location">{restaurant.location}</div>
                </div>
                <div className="top-restaurant-num">{restaurant.numRatings} ratings</div>
              </Link>
            )
          })
        }
      </div>
    )
  }
}

const QUERY_RESTAURANTS = gql`{
  restaurants {
    id
    name
    location
    numRatings
  }
}`

const OPTIONS_RESTAURANTS = {
  options: {
    fetchPolicy: 'network-only'
  }
}

export default graphql(QUERY_RESTAURANTS, OPTIONS_RESTAURANTS)(TopRestaurants)
