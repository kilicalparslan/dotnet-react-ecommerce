using API.Dto;
using API.Entity;

namespace API.Extensions
{
    public static class OrderExtension
    {
        public static IQueryable<OrderDto> OrderToDto(this IQueryable<Order> query)
        {
            return query.Select(i => new OrderDto
            {
                Id = i.Id,
                CustomerId = i.CustomerId,
                FirstName = i.FirstName,
                LastName = i.LastName,
                Phone = i.Phone,
                AddresLine = i.AddresLine,
                City = i.City,
                DeliveryFee = i.DeliveryFee,
                SubTotal = i.SubTotal,
                OrderDate = i.OrderDate,
                OrderStatus = i.OrderStatus,
                OrderItems = i.OrderItems.Select(item => new OrderItemDto
                {
                    Id = item.Id,
                    ProductName = item.ProductName,
                    ProductId = item.ProductId,
                    ProductImage = item.ProductImage,
                    Price = item.Price,
                    Quantity = item.Quantity
                }).ToList()
            });
        }
    }
}