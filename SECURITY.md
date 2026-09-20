# Security Policy

## Scope

This policy covers the portfolio website and the source code in this repository.

## Reporting a vulnerability

Please do not disclose security issues in a public issue. Report them privately to the repository owner through GitHub Security Advisories, or contact the owner through the email address published on the website.

Include:

- A clear description of the issue and its impact;
- The affected URL or file and the steps needed to reproduce it;
- A proof of concept where safe and appropriate; and
- Any suggested mitigation.

Please allow reasonable time for investigation and remediation before public disclosure. Do not include passwords, access tokens, private personal data, or other secrets in a report.

## Important limitation

This is a static client-side website. HTML, CSS, and JavaScript delivered to a visitor can be inspected and copied by design; browser-side anti-copy scripts are only a deterrent and are not a security boundary. Never put secrets, private keys, credentials, or confidential business logic in this repository or in browser-delivered code.

## Maintainer checklist

- Keep secrets out of commits and client-side JavaScript.
- Review external resources before adding them.
- Use HTTPS-only URLs and restrictive `rel` attributes for new-tab links.
- Enable protected branches and require CODEOWNERS review in the repository settings.
- Review GitHub security alerts and rotate any credential that may have been exposed.
