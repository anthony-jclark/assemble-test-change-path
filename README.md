
(note: I gut my original project, but I think this is the smallest working example that shows my issue)

This is just a simple test for writing a plugin that allows me to change the paths of files. The aim is to allow me to structure my source files however I'd like, but then place all rendered files in a top-level folder. This will reduce the number of directories shown in a url.

Also, it will let me name files appropriately, and then change the rendered filenames to something a little more web-friendly.

For this example, I have `pages` that will be rendered (somewhat) normally, and `posts` that will have their filenames changed by the plugin.

Input file structure:

```
── src
    ├── pages
    │   └── index.md
    ├── posts
    │   └── 2015
    │       ├── assemble1.md
    │       ├── assemble2.md
    │       └── assemble3.md
    └── templates
        └── layouts
            └── default.hbs
```

Desired output file structure:

```
── dist
    ├── index.html
    ├── posts
    │   ├── some-title-1.html
    │   ├── some-other-title-2.html
    │   └── third-post.html
```

My current problem is that once I change a file's path (line 47 of `changePath` : `file.path = path.join(file.base, newPath);`), the template engine is no longer rendering the templates.
