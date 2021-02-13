using KhotsoCBookStore.API.Authentication;
using KhotsoCBookStore.API.Contexts;
using KhotsoCBookStore.API.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;

namespace KhotsoCBookStore.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers(setupAction =>
            {
                 setupAction.ReturnHttpNotAcceptable = true;

                //  setupAction.Filters.Add(
                //    new ProducesResponseTypeAttribute(StatusCodes.Status400BadRequest));
                //setupAction.Filters.Add(
                //    new ProducesResponseTypeAttribute(StatusCodes.Status406NotAcceptable));
                //setupAction.Filters.Add(
                //    new ProducesResponseTypeAttribute(StatusCodes.Status500InternalServerError));               

                setupAction.OutputFormatters.Add(new XmlSerializerOutputFormatter());

                var jsonOutputFormatter = setupAction.OutputFormatters
                 .OfType<SystemTextJsonOutputFormatter>().FirstOrDefault();

                if (jsonOutputFormatter != null)
                {
                    // remove text/json as it isn't the approved media type
                    // for working with JSON at API level
                    if (jsonOutputFormatter.SupportedMediaTypes.Contains("text/json"))
                    {
                        jsonOutputFormatter.SupportedMediaTypes.Remove("text/json");
                    }
                } 
             });            

            var connectionString = Configuration["ConnectionStrings:KhotsoCbookStoreDBConnectionString"];
            services.AddDbContext<khotsoCBookStoreDbContext>(o => o.UseSqlServer(connectionString));

            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = actionContext =>
                {
                    var actionExecutingContext =
                        actionContext as Microsoft.AspNetCore.Mvc.Filters.ActionExecutingContext;

                    // if there are modelstate errors & all keys were correctly
                    // found/parsed we're dealing with validation errors
                    if (actionContext.ModelState.ErrorCount > 0
                        && actionExecutingContext?.ActionArguments.Count == actionContext.ActionDescriptor.Parameters.Count)
                    {
                        //return a 422 incase of a validation error because by default  api controllers return a 400 bad request
                        return new UnprocessableEntityObjectResult(actionContext.ModelState);
                    }

                    // if one of the keys wasn't correctly found / couldn't be parsed
                    // we're dealing with null/unparseable input
                    return new BadRequestObjectResult(actionContext.ModelState);
                };
            });

            services.AddScoped<IBookRepository, BookRepository>();
            services.AddScoped<IAuthorRepository, AuthorRepository>();

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddAuthentication("Basic")
            .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>("Basic", null);

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOriginsHeadersAndMethods",
                    builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            });

            services.AddSwaggerGen(setupAction =>
            {
                setupAction.SwaggerDoc("KhotsoCBookStoreAPISpecification", new Microsoft.OpenApi.Models.OpenApiInfo()
                {
                    Title = "KhotsoCBookStore API",
                    Version = "1.0",
                    Description = "The business has requested the development of a new system which allows users to register online over Http which provides the same functionality.",
                    Contact = new Microsoft.OpenApi.Models.OpenApiContact()
                    {
                        Email = "Mokhetkc@hotmail.com",
                         Name = "Khotso Mokhethi",
                         Url = new Uri("https://wwww.github.com/EdCharlesDiesel")
                    }                    
                });

                //setupAction.ResolveConflictingActions(apiDescriptions =>
                //{
                //    return apiDescriptions.First();
                //});

                setupAction.AddSecurityDefinition("basicAuth", new OpenApiSecurityScheme()
                {
                    Type = SecuritySchemeType.Http,
                    Scheme = "basic",
                    Description = "Input your username and password to access this API"
                });

                setupAction.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference {
                                Type = ReferenceType.SecurityScheme,
                                Id = "basicAuth" }
                        }, new List<string>() }
                });                

                var xmlCommentsFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";

                var xmlCommentsFullPath = Path.Combine(AppContext.BaseDirectory,xmlCommentsFile);

                setupAction.IncludeXmlComments(xmlCommentsFullPath);
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
#pragma warning disable CS0618 // Type or member is obsolete
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
#pragma warning restore CS0618 // Type or member is obsolete
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseSwagger();

            app.UseSwaggerUI(setupAction =>{
                 setupAction.SwaggerEndpoint("/swagger/KhotsoCBookStoreAPISpecification/swagger.json", "KhotsoCBookStore API");
                //By specifiying the routerefix the swagger documentaion will be available at the root
                setupAction.RoutePrefix ="";

                setupAction.DefaultModelExpandDepth(2);
                setupAction.DefaultModelRendering(Swashbuckle.AspNetCore.SwaggerUI.ModelRendering.Model);
                setupAction.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);

                setupAction.EnableDeepLinking();
                setupAction.DisplayOperationId();
                });

            // Enable CORS
            app.UseCors("AllowAllOriginsHeadersAndMethods");

            app.UseAuthorization();

            app.UseAuthentication();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
