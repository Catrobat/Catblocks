import requests

baseURL = 'https://api.github.com/search/issues'
query = 'q=repo:Catrobat/Catblocks+is:pr+is:merged'
sort = 'sort=updated'
order = 'order=desc'
per_page = 'per_page=1'

requestURL = baseURL + '?' + query + '&' + sort + '&' + order + '&' + per_page
r = requests.get(requestURL)
response = r.json()
print(response['items'][0]['number'])