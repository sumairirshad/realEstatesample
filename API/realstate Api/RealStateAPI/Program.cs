using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RealStateAPI.Context;
using RealStateAPI.Mapper;
using RealStateAPI.Repositories;
using RealStateAPI.Repositories.Interface;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IUsers, UserRepo>();
builder.Services.AddScoped<IProperties, PropertyRepo>();
builder.Services.AddScoped<IFavourites, FavouritesRepo>();

builder.Services.AddAutoMapper(cfg =>
{
    cfg.AddProfile<MapperConfig>();
});

builder.Services.AddHttpClient();

builder.Services.AddCors(options =>
{
    options.AddPolicy("EnableCORS", builder =>
    {
        builder.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("EnableCORS");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
