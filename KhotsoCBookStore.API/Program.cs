using KhotsoCBookStore.API.Contexts;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;

namespace KhotsoCBookStore.API
{
    public class Program
    {
    //    public static void Main(string[] args)
    //    {
    //        BuildWebHost(args).Run();
    //    }

    //    public static IWebHost BuildWebHost(string[] args) =>
    //        WebHost.CreateDefaultBuilder(args)
    //            .UseUrls("http://localhost:5000/")
    //            .UseStartup<Startup>()
    //            .Build();
      public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
