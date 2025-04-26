using API.Data;
using API.Dto;
using API.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly DataContext _context;

    public CartController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<CartDto>> GetCart()
    {
        return MapCartToDto(await GetOrCreateCart());
    }

    [HttpPost]
    public async Task<ActionResult<Cart>> AddItemToCart(int productId, int quantity)
    {
        var cart = await GetOrCreateCart();
        var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == productId);
        if (product == null)
        {
            return NotFound("Product not found");
        }
        cart.AddItem(product, quantity);
        var result = await _context.SaveChangesAsync() > 0;
        if (result)
        {
            return CreatedAtAction(nameof(GetCart), MapCartToDto(cart));
        }
        return BadRequest(new ProblemDetails { Title = "Problem saving item to cart" });
    }

    [HttpDelete]
    public async Task<ActionResult<Cart>> RemoveItemFromCart(int productId, int quantity)
    {
        var cart = await GetOrCreateCart();

        cart.RemoveItem(productId, quantity);

        var result = await _context.SaveChangesAsync();
        if (result > 0)
        {
            return Ok();
        }
        return BadRequest(new ProblemDetails { Title = "Problem removing item from cart" });
    }

    private async Task<Cart> GetOrCreateCart()
    {
        var cart = await _context.Carts
                    .Include(c => c.CartItems)
                    .ThenInclude(c => c.Product)
                    .Where(i => i.CustomerId == Request.Cookies["customerId"])
                    .FirstOrDefaultAsync();
        if (cart == null)
        {
            var customerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions
            {
                Expires = DateTimeOffset.UtcNow.AddDays(30),
                IsEssential = true,
            };

            Response.Cookies.Append("customerId", customerId, cookieOptions);
            cart = new Cart { CustomerId = customerId };

            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
        }
        return cart;
    }
    private CartDto MapCartToDto(Cart cart)
    {
        return new CartDto
        {
            CartId = cart.CartId,
            CustomerId = cart.CustomerId,
            CartItems = cart.CartItems.Select(i => new CartItemDto
            {
                ProductId = i.ProductId,
                Name = i.Product.Name,
                Price = i.Product.Price,
                Quantity = i.Quantity,
                ImageUrl = i.Product.ImageUrl
            }).ToList()
        };
    }
}