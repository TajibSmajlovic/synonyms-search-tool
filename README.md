## Live Demo (**https://synonyms-search-tool.onrender.com**)

## System Requirements to run the app locally:

- [git][git] v2.13 or greater
- [npm][npm] v8.16.0 or greater
- [NodeJS][node] `14 || 16 || 18`

To verify things are set up properly, you can run this:

```shell
git --version
node --version
npm --version
```

## Instructions to run the app locally:

1. Clone the repository

   ```shell
   git clone https://github.com/TajibSmajlovic/synonyms-search-tool
   ```

2. navigate to the project directory:
   ```shell
   cd synonyms-search-tool
   ```
3. install required dependencies with the following command:
   ```shell
   npm run setup
   ```
4. after installation of the dependencies is finished, run:

   ```shell
   npm start
   ```

   4.1. Verify that the server is running by navigating to _http://localhost:8000/api/health_ in the browser

   4.2. Verify that the client is running by navigating to _http://localhost:3000_ in the browser

### That's it! You are ready to go! 🦾

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[git]: https://git-scm.com/
