/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var COMMENTS_FILE = process.env.COMMENTS_FILE || path.join(__dirname, 'comments.json');
var MAX_AUTHOR_LENGTH = 100;
var MAX_TEXT_LENGTH = 1000;

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

function readComments(callback) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      return callback(err);
    }
    var comments;
    try {
      comments = JSON.parse(data);
    } catch (parseErr) {
      return callback(parseErr);
    }
    callback(null, comments);
  });
}

app.get('/api/comments', function(req, res) {
  readComments(function(err, comments) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Unable to read comments' });
    }
    res.json(comments);
  });
});

app.post('/api/comments', function(req, res) {
  var author = typeof req.body.author === 'string' ? req.body.author.trim() : '';
  var text = typeof req.body.text === 'string' ? req.body.text.trim() : '';

  if (!author || !text) {
    return res.status(400).json({ error: 'author and text are required non-empty strings' });
  }
  if (author.length > MAX_AUTHOR_LENGTH || text.length > MAX_TEXT_LENGTH) {
    return res.status(400).json({
      error: 'author must be ' + MAX_AUTHOR_LENGTH + ' characters or fewer and text ' + MAX_TEXT_LENGTH + ' or fewer'
    });
  }

  readComments(function(err, comments) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Unable to read comments' });
    }
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newComment = {
      id: Date.now(),
      author: author,
      text: text,
    };
    comments.push(newComment);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(writeErr) {
      if (writeErr) {
        console.error(writeErr);
        return res.status(500).json({ error: 'Unable to save comments' });
      }
      res.json(comments);
    });
  });
});

if (require.main === module) {
  app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
  });
}

module.exports = app;