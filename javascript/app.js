

const SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

const state = {
  nextPageToken: '',
  prevPageToken: '',
  query: '',
  next: '',
  prev: ''
};

function getDataFromApi(searchTerm, callBack) {
  const query = {
    part: 'snippet, id',
    maxResults: 10,
    q: `${searchTerm}`,
    type: 'video',
    key: "AIzaSyCW8YuPcEOaPN3An0mzKOetSNs41Fdysog"
  };
  $.getJSON(SEARCH_URL, query, callBack);
}

$('#next-btn').click(function(event) {
  event.preventDefault();
  nextPage(state.nextPageToken);
  $('#prev-btn').show();
})
function nextPage() {
  const query = {
    part: 'snippet, id',
    maxResults: 10,
    q: state.query,
    pageToken: state.nextPageToken,
    type: 'video',
    key: "AIzaSyCW8YuPcEOaPN3An0mzKOetSNs41Fdysog"
  };
  $.getJSON(SEARCH_URL, query, displayData);
}

$('#prev-btn').click(function(event) {
  event.preventDefault();
  prevPage(state.prevPageToken)
})
function prevPage() {
  const query = {
    part: 'snippet, id',
    maxResults: 10,
    q: state.query,
    pageToken: state.prevPageToken,
    type: 'video',
    key: "AIzaSyCW8YuPcEOaPN3An0mzKOetSNs41Fdysog"
  };
  $.getJSON(SEARCH_URL, query, displayData);
}


function displayData(data) {
  state.nextPageToken = data.nextPageToken
  state.prevPageToken = data.prevPageToken
  const results = data.items.map(function(item, i) {
    if (i % 2 === 0)
      return `<div class="row">` + renderApiData(item);
    else
      return renderApiData(item) + `</div>`;
  });
  // renderApiData(item));
  console.log(data)
  $('.js-search-results').html(results);
};

function renderApiData(result) {
  console.log(result)
  return `

    <div class="col-6">
      <li class="col-6 results">
        <a class="thumbs" href="https://youtu.be/${result.id.videoId}"  target="_blank">
          <img src="${result.snippet.thumbnails.high.url}">
        </a>
        <span class="titles">${result.snippet.title}</span>
      </li>
    </div>`;
}

function watchSubmit(event) {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-search-field');
    state.query = queryTarget.val();
    queryTarget.val('');
    getDataFromApi(state.query, displayData);
    $('#next-btn').show();
  });
}

$(watchSubmit);
$(document).ready(function() {
  $('.buttons').hide();
  $('#js-body').fadeIn(500);
  $('.js-search-field').focus(function() {
    $(this).val('');
    $('.buttons').hide();
  })
})
