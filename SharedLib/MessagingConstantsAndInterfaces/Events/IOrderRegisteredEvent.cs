﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MessagingInterfacesConstants.Events
{
    public interface IOrderRegisteredEvent
    {
       Guid OrderId { get; }
    }
}
