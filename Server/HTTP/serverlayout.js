exports.htmlContent = (result) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Page Title</title>
</head>
<body>
  <h1>Hello, World!</h1>
  
  <div>
    <p>Your dynamic content based on the database result:</p>
    <pre>${JSON.stringify(result, null, 2)}</pre>
  </div>
</body>
</html>
`;
