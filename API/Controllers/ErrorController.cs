using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ErrorController : ControllerBase
{
    [HttpGet("not-found")]
    public IActionResult NotFoundError()
    {
        return NotFound();
    }

    [HttpGet("bad-request")]
    public IActionResult BadRequestError()
    {
        return BadRequest();
    }

    [HttpGet("unauthorized")]
    public IActionResult UnauthorizedError()
    {
        return Unauthorized();
    }

    [HttpGet("validation-error")]
    public IActionResult ValidationError()
    {
        ModelState.AddModelError("Problem 1", "This is a validation error 1");
        ModelState.AddModelError("Problem 2", "This is a validation error 2");
        return ValidationProblem();
    }

    [HttpGet("server-error")]
    public IActionResult ServerError()
    {
        throw new Exception("This is a server error");
    }
}