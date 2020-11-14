using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    // [ApiController]  Both these properties are written in BaseApiController that we derived UserController from so that's why no need in here due to inheretance
    // [Route("api/[controller]")]
    // public class UsersController : ControllerBase
    [Authorize]
    public class UsersController : BaseApiController
    {

        // private readonly DataContext _context;
        // public UsersController(DataContext context)
        // {
        //     _context = context;

        // }        
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;

        }
        /*[HttpGet]
        // [AllowAnonymous]
        // public ActionResult<IEnumerable<AppUser>> GetUsers()
        // public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            // return _context.Users.ToListAsync();
            // return await _context.Users.ToListAsync();
            // return Ok(await _userRepository.GetUsersAsync());
            var users = await _userRepository.GetUsersAsync();
            return Ok();
        }
         [Authorize]
         [HttpGet("{id}")]
        // public ActionResult<AppUser> GetUser(int id)
        {
            // return _context.Users.Find(id);
            // return await _context.Users.FindAsync(id);
            return await _userRepository.GetUserByIdAsync(id);
        }*/
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            // var users = await _userRepository.GetUsersAsync();
            // var usersToReturn = _mapper.Map<IEnumerable<MemberDto>>(users);
            // return Ok(usersToReturn);
            var users = await _userRepository.GetMembersAsync();
            return Ok(users);
        }

        [HttpGet("{username}")]
        // public async Task<ActionResult<AppUser>> GetUser(string userName)
        public async Task<ActionResult<MemberDto>> GetUser(string userName)
        {
            // return await _userRepository.GetUserByUserNameAsync(userName);
            // var user = await _userRepository.GetUserByUserNameAsync(userName);
            // return _mapper.Map<MemberDto>(user);
            return await _userRepository.GetMemberAsync(userName);
        }
    }
}