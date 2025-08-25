import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CustomerReviews = ({ reviews, averageRating, totalReviews }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAllReviews, setShowAllReviews] = useState(false);

  const ratingFilters = [
    { id: 'all', label: 'All Reviews', count: totalReviews },
    { id: '5', label: '5 Stars', count: reviews?.filter(r => r?.rating === 5)?.length },
    { id: '4', label: '4 Stars', count: reviews?.filter(r => r?.rating === 4)?.length },
    { id: '3', label: '3 Stars', count: reviews?.filter(r => r?.rating === 3)?.length },
    { id: '2', label: '2 Stars', count: reviews?.filter(r => r?.rating === 2)?.length },
    { id: '1', label: '1 Star', count: reviews?.filter(r => r?.rating === 1)?.length }
  ];

  const filteredReviews = selectedFilter === 'all' 
    ? reviews 
    : reviews?.filter(review => review?.rating === parseInt(selectedFilter));

  const displayedReviews = showAllReviews ? filteredReviews : filteredReviews?.slice(0, 3);

  const renderStars = (rating, size = 16) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <Icon
            key={star}
            name="Star"
            size={size}
            className={star <= rating ? 'text-accent fill-current' : 'text-border'}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="font-heading font-bold text-xl text-foreground">Customer Reviews</h2>
      {/* Rating Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-3xl font-mono font-bold text-primary">{averageRating}</div>
              <div className="flex justify-center mt-1">
                {renderStars(Math.round(averageRating), 20)}
              </div>
            </div>
            <div>
              <p className="font-body font-medium text-foreground">
                Based on {totalReviews} reviews
              </p>
              <p className="text-sm text-muted-foreground font-body">
                {Math.round((reviews?.filter(r => r?.rating >= 4)?.length / totalReviews) * 100)}% recommend this product
              </p>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-1 min-w-[200px]">
            {[5, 4, 3, 2, 1]?.map((rating) => {
              const count = reviews?.filter(r => r?.rating === rating)?.length;
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              
              return (
                <div key={rating} className="flex items-center space-x-2 text-sm">
                  <span className="font-mono w-6">{rating}</span>
                  <Icon name="Star" size={14} className="text-accent fill-current" />
                  <div className="flex-1 bg-surface rounded-full h-2">
                    <div 
                      className="bg-accent rounded-full h-2 transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="font-mono w-8 text-muted-foreground">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {ratingFilters?.map((filter) => (
          <Button
            key={filter?.id}
            variant={selectedFilter === filter?.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter(filter?.id)}
            className="text-sm"
          >
            {filter?.label} ({filter?.count})
          </Button>
        ))}
      </div>
      {/* Reviews List */}
      <div className="space-y-4">
        {displayedReviews?.map((review) => (
          <div key={review?.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <Image
                src={review?.avatar}
                alt={`${review?.name}'s avatar`}
                className="w-12 h-12 rounded-full object-cover"
              />
              
              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div>
                    <h4 className="font-body font-medium text-foreground">{review?.name}</h4>
                    <div className="flex items-center space-x-2">
                      {renderStars(review?.rating)}
                      <span className="text-sm text-muted-foreground font-body">
                        {formatDate(review?.date)}
                      </span>
                      {review?.verified && (
                        <span className="bg-success/10 text-success px-2 py-1 rounded-full text-xs font-body">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="font-body text-foreground leading-relaxed">{review?.comment}</p>

                {/* Review Images */}
                {review?.images && review?.images?.length > 0 && (
                  <div className="flex space-x-2 overflow-x-auto">
                    {review?.images?.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`Review image ${index + 1}`}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                    ))}
                  </div>
                )}

                {/* Helpful Actions */}
                <div className="flex items-center space-x-4 pt-2">
                  <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-gentle">
                    <Icon name="ThumbsUp" size={16} />
                    <span>Helpful ({review?.helpful})</span>
                  </button>
                  <button className="text-sm text-muted-foreground hover:text-foreground transition-gentle">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Show More Button */}
      {filteredReviews?.length > 3 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(!showAllReviews)}
          >
            {showAllReviews ? 'Show Less' : `Show All ${filteredReviews?.length} Reviews`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;