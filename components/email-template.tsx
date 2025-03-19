import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  service: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  service,
  message,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
    <h1 style={{ color: '#d9534f' }}>New Inquiry from the website contact form</h1>
    <p>Here are the details:</p>

    <table style={{ width: '100%', borderCollapse: 'collapse', margin: '10px 0' }}>
      <tbody>
        <tr>
          <td style={{ fontWeight: 'bold', padding: '5px', borderBottom: '1px solid #ddd' }}>Name:</td>
          <td style={{ padding: '5px', borderBottom: '1px solid #ddd' }}>{name}</td>
        </tr>
        <tr>
          <td style={{ fontWeight: 'bold', padding: '5px', borderBottom: '1px solid #ddd' }}>Email:</td>
          <td style={{ padding: '5px', borderBottom: '1px solid #ddd' }}>
            <a href={`mailto:${email}`}>{email}</a>
          </td>
        </tr>
        <tr>
          <td style={{ fontWeight: 'bold', padding: '5px', borderBottom: '1px solid #ddd' }}>Service Inquired:</td>
          <td style={{ padding: '5px', borderBottom: '1px solid #ddd' }}>{service}</td>
        </tr>
        <tr>
          <td style={{ fontWeight: 'bold', padding: '5px', borderBottom: '1px solid #ddd' }}>Message:</td>
          <td style={{ padding: '5px', borderBottom: '1px solid #ddd' }}>{message}</td>
        </tr>
      </tbody>
    </table>

    <p>Please review the inquiry and respond as needed.</p>

    <p>Best regards, <br />Website Contact System</p>
  </div>
);