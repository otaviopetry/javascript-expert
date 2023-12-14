import Payment from "./events/payment.js";
import Marketing from "./observers/marketing.js";
import Shipment from "./observers/shipment.js";
import PaymentSubject from "./subjects/paymentSubject.js";

const subject = new PaymentSubject();

const marketing = new Marketing();
subject.subscribe(marketing);

const shipment = new Shipment();
subject.subscribe(shipment);

const payment = new Payment(subject);
payment.creditCard({ userName: 'otaviopetry', id: '123456789' });

subject.unsubscribe(marketing);

payment.creditCard({ userName: 'pietra', id: '987654321' });
