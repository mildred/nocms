nocms: transform your browser into a website editor
===================================================

[Demo](https://rawgit.com/mildred/nocms/howling-mad/page-xhtml.html) (would work
if github could serve raw files with any content type, if only with a query
string `?content-type=text/html`, and followed submodules).

Project goals:

- create a HTML WYSIWYG/M editor in JavaScript that run in your browser
- do not require server-side specific code. This should run on any dumb HTTP
  server that allow write access using PUT queries. In the long term, this
  should allow hosting on a webserver implementing the ipns distributed
  filesystem.
- be powerful enough to create a blog. Create new pages / posts. Aggregate them
  to the main page (using the `<link>` tag) and let the main page generate
  seamless `<iframes>` for each post we have.
- do not require JavaScript for normal users (not using the editor). XSLT can be
  used instead to aggregate posts in the front page. This improve the user's
  privacy.
- This should also allow for user comments. Comments would be standalone pages
  hosted on the comment author's namespace on ipns. The comment would contain a
  link to the original article, and would publish a backlink using some global
  mechanism.
- Comments could be displayed on the original article the following ways:
    - the original article's author validates comments manually and put a
      backlink (`<link rev>`) on the article `<head>`, and use a XSLT stylesheet
      to generate iframes on the page body to show comments.
    - use of JavaScript (unfortunately) to query the distributed backlink
      storage and show the comments
    - use a browser extension for that.


