// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;
using System.Collections.Generic;
using System.Security.Claims;

namespace Euromonitor.IDP
{
    public class Config
    {
        public static List<TestUser> GetUsers()
        {
            return new List<TestUser>
            {
                new TestUser
                {
                    SubjectId = "fec0a4d6-5830-4eb8-8024-272bd5d6d2bb",
                    Username = "Khotso ",
                    Password = "password",
                    Claims = new List<Claim>
                    {
                        new Claim("given_name", "khotso"),
                        new Claim("family_name", "Mokhethi"),
                        new Claim("role", "Administrator"),
                    }
                },
                new TestUser
                {
                    SubjectId = "c3b7f625-c07f-4d7d-9be1-ddff8ff93b4d",
                    Username = "Kagiso",
                    Password = "password",
                    Claims = new List<Claim>
                    {
                        new Claim("given_name", "kagiso"),
                        new Claim("family_name", "Mokhethi"),
                        new Claim("role", "Book Subscriber"),
                    }
                }
            };
        }

              public static List<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
               new IdentityResources.OpenId(),
               new IdentityResources.Profile(),
               new IdentityResource("roles", "Your role(s)", new []{"role"}),
            };
        }

        internal static IEnumerable<ApiResource> GetApiResources()
        {
            return new[] {
                new ApiResource("khotsocbookstoreapi", "Khotso C BookStore API", new[] { "role" })
            };
        }
        public static List<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientName = "Khotso C Book Store",
                    ClientId="khotsocbookstorclient",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    RequireConsent = false,
                    AllowAccessTokensViaBrowser = true,
                    RedirectUris =new List<string>
                    {
                        "https://localhost:4200/signin-oidc",
                        "https://localhost:4200/redirect-silentrenew"
                    },
                    AccessTokenLifetime = 180,
                    PostLogoutRedirectUris = new[]{
                        "https://localhost:4200/" },
                    AllowedScopes = new []
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "roles",
                        "khotsocbookstoreapi",
                    }
                }
            };
        }
    }
}