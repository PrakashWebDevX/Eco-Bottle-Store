import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OrderHistory = ({ orders }) => {
  const [expandedOrder, setExpandedOrder] = useState(null);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'text-success bg-success/10';
      case 'shipped':
        return 'text-primary bg-primary/10';
      case 'processing':
        return 'text-warning bg-warning/10';
      case 'cancelled':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-surface';
    }
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Order History
        </h2>
        <Button variant="outline" size="sm">
          View All Orders
        </Button>
      </div>
      <div className="space-y-4">
        {orders?.map((order) => (
          <div
            key={order?.id}
            className="border border-border rounded-lg p-4 hover:shadow-organic transition-gentle"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Package" size={20} className="text-muted-foreground" />
                  <span className="font-mono font-medium text-foreground">
                    #{order?.orderNumber}
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order?.status)}`}>
                  {order?.status}
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm font-body text-muted-foreground">
                  {order?.orderDate}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleOrderExpansion(order?.id)}
                  className="h-8 w-8"
                >
                  <Icon 
                    name={expandedOrder === order?.id ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                  />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  {order?.items?.slice(0, 3)?.map((item, index) => (
                    <div
                      key={index}
                      className="w-10 h-10 rounded-lg border-2 border-background overflow-hidden"
                    >
                      <Image
                        src={item?.image}
                        alt={item?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {order?.items?.length > 3 && (
                    <div className="w-10 h-10 rounded-lg border-2 border-background bg-surface flex items-center justify-center">
                      <span className="text-xs font-mono font-bold text-muted-foreground">
                        +{order?.items?.length - 3}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-body font-medium text-foreground">
                    {order?.items?.length} item{order?.items?.length !== 1 ? 's' : ''}
                  </p>
                  <p className="text-sm font-body text-muted-foreground">
                    Total: ${order?.total}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {order?.status === 'Delivered' && (
                  <Button variant="outline" size="sm">
                    Reorder
                  </Button>
                )}
                {(order?.status === 'Shipped' || order?.status === 'Processing') && (
                  <Button variant="outline" size="sm">
                    Track Order
                  </Button>
                )}
              </div>
            </div>

            {expandedOrder === order?.id && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-heading font-medium text-foreground mb-3">
                      Items Ordered
                    </h4>
                    <div className="space-y-3">
                      {order?.items?.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden">
                            <Image
                              src={item?.image}
                              alt={item?.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-body font-medium text-foreground">
                              {item?.name}
                            </p>
                            <p className="text-sm font-body text-muted-foreground">
                              Color: {item?.color} • Qty: {item?.quantity}
                            </p>
                          </div>
                          <span className="font-mono font-medium text-foreground">
                            ${item?.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-heading font-medium text-foreground mb-3">
                      Delivery Details
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-body text-muted-foreground">
                          Shipping Address:
                        </span>
                        <span className="text-sm font-body text-foreground">
                          {order?.shippingAddress}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-body text-muted-foreground">
                          Delivery Date:
                        </span>
                        <span className="text-sm font-body text-foreground">
                          {order?.deliveryDate}
                        </span>
                      </div>
                      {order?.trackingNumber && (
                        <div className="flex justify-between">
                          <span className="text-sm font-body text-muted-foreground">
                            Tracking:
                          </span>
                          <span className="text-sm font-mono text-primary">
                            {order?.trackingNumber}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;