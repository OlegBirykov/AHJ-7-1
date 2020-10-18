const tickets = [
  {
    id: 1,
    name: 'запись 1',
    description: 'полное описание записи 1',
    status: false,
    created: 28364923649235,
  },
  {
    id: 2,
    name: 'запись 2',
    description: 'полное описание записи 2',
    status: true,
    created: 36492366,
  },
  {
    id: 3,
    name: 'запись 3',
    description: 'полное описание записи 3',
    status: false,
    created: 35356492366,
  },
];

const http = require('http');
const Koa = require('koa');

const app = new Koa();

app.use(async (ctx) => {
  const {
    method,
    id: reqId,
    name: reqName,
    description: reqDescription,
    status: reqStatus,
  } = ctx.request.query;

  const fullToShort = () => JSON.stringify(tickets.map(
    ({
      id, name, status, created,
    }) => ({
      id, name, status, created,
    }),
  ));

  let ticket;
  let index;

  switch (method) {
    case 'allTickets':
      ctx.response.body = fullToShort();
      return;

    case 'ticketById':
      ticket = tickets.find(
        ({ id }) => id === +reqId,
      );

      if (!ticket) {
        ctx.response.body = 'Ticket Not Found';
        ctx.response.status = 404;
        return;
      }

      ctx.response.body = ticket.description;
      return;

    case 'createTicket':
      if (!reqId) {
        tickets.push({
          id: tickets ? tickets[tickets.length - 1].id + 1 : 1,
          name: reqName,
          description: reqDescription,
          status: reqStatus,
          created: Date.now(),
        });

        ctx.response.body = fullToShort();
        return;
      }

      ticket = tickets.find(
        ({ id }) => id === +reqId,
      );

      if (!ticket) {
        ctx.response.body = 'Ticket Not Found';
        ctx.response.status = 404;
        return;
      }

      ticket.name = reqName;
      ticket.description = reqDescription;
      ticket.status = reqStatus;
      ctx.response.body = fullToShort();
      return;

    case 'deleteTicket':
      index = tickets.findIndex(
        ({ id }) => id === +reqId,
      );

      if (index < 0) {
        ctx.response.body = 'Ticket Not Found';
        ctx.response.status = 404;
        return;
      }

      tickets.splice(index, 1);
      ctx.response.body = fullToShort();
      return;

    default:
      ctx.response.body = 'Invalid Request Format';
      ctx.response.status = 400;
  }
});

const port = process.env.PORT || 7070;
http.createServer(app.callback()).listen(port);
