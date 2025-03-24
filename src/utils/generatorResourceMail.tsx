export function generatorResourceMail(email: string, resource: string) {
  return `
    <div style="
      font-family: Arial, sans-serif;
      border: 1px solid #ddd;
      padding: 16px;
      border-radius: 8px;
      max-width: 400px;
      background-color: #f9f9f9;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    ">
      <p style="font-size: 16px; font-weight: bold; margin: 0; color: #333;">
        Email: <span style="color: #007bff;">${email}</span>
      </p>
      <p style="font-size: 14px; margin: 8px 0 0; color: #666;">
        Resource: <span style="color: #28a745;">${resource}</span>
      </p>
    </div>
  `;
}
