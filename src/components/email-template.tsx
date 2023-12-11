import * as React from 'react';

interface EmailTemplateProps {
 firstName: string;
}

const EmailTemplate = ({
 firstName,
}: EmailTemplateProps) => {
 return (
  <div>
   <h1>Welcome, {firstName}!</h1>
  </div>
 )
};

export default EmailTemplate;
