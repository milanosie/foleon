# Notes about structure and decisions of then project that might be interesting


- I created a few extensions within Tailwind.config to make certain styling implementations easier.
- The application completely uses standalone components which are relatively new Angular features, making it easier to use with less boilerplate.
- The API Client Secret is stored in the environment file, which is not acceptable for a real world scenario, but for this assignment does the trick.
- Currently, no refresh mechanism is implemented for the token, which would be necessary for a real world scenario. This is due to my time constraints.
- The application is **not type safe** when it comes to API responses, this is something that I would do with more time.
- I created pipes to make API data user-friendly, such as the readable pipe.
- Authentication for HTTP requests is done in the interceptor, which intercepts all requests and adds the token to the header.

# Things I would do (differently) with more time:

- Implement a refresh token mechanism
- Separate the pages into smaller components
- Implement a better error handling mechanism
- Implement a better type safety for API responses
- Implement a better way to store the API Client Secret
- Implement a proper state Managmeent system, like NgRX (Redux based) with API Caching

# Some key files to look at:

- `src/app/core/interceptors/auth.interceptor.ts` - The interceptor that adds the token to the header
- `src/app/core/services/authetication.service.ts` - The service that handles all the authentication and token
  <br><br>
- `src/app/shared/pipes/readable.pipe.ts` - The pipe that makes the API data user-friendly
<br><br>
- `src/app/shared/services/publication.service.ts` - The service that handles all the API requests for retrieving data
  <br><br>
- `src/app/shared/filter/filter.component.ts` - The filter component, to filter on Category and publication status
- `src/app/pages/landing/landing.component.ts` - The landing page component, where the projects are displayed
- `src/app/pages/project/project.component.ts` - The project page component, where documents from a project are displayed
  <br><br>
- `tailwind.config.js` - The tailwind configuration file, where I added some custom extensions
- `src/app.config.ts` - Standalone non-module based config file for the application
