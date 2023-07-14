import {ticketsDao} from "../dao/factory.js"

export class TicketService{
    static async createTicket(ticket){
        return ticketsDao.createTicket(ticket);
    };
}