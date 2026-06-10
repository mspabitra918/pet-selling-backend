import { Injectable, Logger } from "@nestjs/common";
import Mailgun from "mailgun.js";
import FormData = require("form-data");
import { ConfigService } from "@nestjs/config";
export enum OrderStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

interface OrderStatusEmailDetails {
  orderId: string;
  customerName: string;
  email: string;
  petName: string;
  petBreed: string;
  status: OrderStatus;
}
export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private mailgun: any;
  private domain: string;

  constructor(private readonly config: ConfigService) {
    const mailgun = new Mailgun(FormData);
    this.mailgun = mailgun.client({
      username: "api",
      key: this.config.get<string>("MAILGUN_API_KEY") ?? "",
    });
    this.domain = this.config.get<string>("MAILGUN_DOMAIN") ?? "";
  }

  private async send(payload: EmailPayload): Promise<void> {
    // try {
    //   await this.mailgun.messages.create(this.domain, {
    //     from: this.config.get<string>(
    //       "MAILGUN_FROM",
    //       "TruCredit Capital <noreply@trucreditcapital.com>",
    //     ),
    //     to: payload.to,
    //     subject: payload.subject,
    //     html: payload.html,
    //   });
    //   this.logger.log(`Email sent to ${payload.to}: ${payload.subject}`);
    // } catch (err) {
    //   this.logger.error(`Failed to send email to ${payload.to}`, err as any);
    // }
    try {
      console.log("DOMAIN:", this.domain);

      const key = this.config.get<string>("MAILGUN_API_KEY") ?? "";
      console.log("KEY PREFIX:", key.substring(0, 10));

      const result = await this.mailgun.messages.create(this.domain, {
        from: `noreply@${this.domain}`,
        to: "your-email@gmail.com",
        subject: "Test",
        text: "Hello",
      });

      console.log("SUCCESS:", result);
    } catch (error: any) {
      console.log("STATUS:", error.status);
      console.log("DETAILS:", error.details);
      console.log("ERROR:", error);
    }
  }

  async sendOrderStatusEmail(details: OrderStatusEmailDetails): Promise<void> {
    const { orderId, customerName, email, petName, petBreed, status } = details;

    const statusConfig = {
      [OrderStatus.PENDING]: {
        title: "Order Received",
        icon: "🐾",
        color: "#f59e0b",
        message:
          "We have received your order and are waiting for payment confirmation.",
      },

      [OrderStatus.PAID]: {
        title: "Payment Confirmed",
        icon: "💳",
        color: "#16a34a",
        message:
          "Your payment has been successfully received. Our team is preparing your pet for delivery.",
      },

      [OrderStatus.SHIPPED]: {
        title: "Pet Shipped",
        icon: "🚚",
        color: "#2563eb",
        message:
          "Your pet is on the way to its new home. We will keep you updated on the delivery progress.",
      },

      [OrderStatus.DELIVERED]: {
        title: "Pet Delivered",
        icon: "🏡",
        color: "#16a34a",
        message:
          "Your pet has been successfully delivered. Welcome your new companion home!",
      },

      [OrderStatus.COMPLETED]: {
        title: "Order Completed",
        icon: "🎉",
        color: "#059669",
        message:
          "Your order has been completed successfully. Thank you for choosing us.",
      },

      [OrderStatus.CANCELLED]: {
        title: "Order Cancelled",
        icon: "❌",
        color: "#dc2626",
        message:
          "Your order has been cancelled. Please contact support if you have any questions.",
      },
    };

    const config = statusConfig[status];

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
        
        <div style="background:#f8fafc;padding:20px;text-align:center">
          <h1>Premium Pet Store</h1>
        </div>

        <div style="padding:30px;border:1px solid #e5e7eb">
          
          <div style="text-align:center">
            <span style="font-size:50px">${config.icon}</span>
          </div>

          <h2 style="text-align:center;color:${config.color}">
            ${config.title}
          </h2>

          <p>Hello ${customerName},</p>

          <p>${config.message}</p>

          <div style="background:#f3f4f6;padding:15px;border-radius:8px;margin-top:20px">
            
            <table width="100%">
              <tr>
                <td><strong>Order ID</strong></td>
                <td align="right">${orderId}</td>
              </tr>

              <tr>
                <td><strong>Pet Name</strong></td>
                <td align="right">${petName}</td>
              </tr>

              <tr>
                <td><strong>Breed</strong></td>
                <td align="right">${petBreed}</td>
              </tr>

              <tr>
                <td><strong>Status</strong></td>
                <td align="right">
                  <span
                    style="
                      background:${config.color};
                      color:white;
                      padding:4px 10px;
                      border-radius:12px;
                    "
                  >
                    ${status}
                  </span>
                </td>
              </tr>
            </table>

          </div>

          <p style="margin-top:20px">
            Thank you for trusting us to help you find your new furry companion.
          </p>

        </div>
      </div>
    `;

    await this.send({
      to: email,
      subject: `${config.title} - Order #${orderId}`,
      html,
    });
  }
}
