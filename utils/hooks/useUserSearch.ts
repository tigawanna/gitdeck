
import { useQuery } from 'react-query';





export const useUserSearch=()=>{
const debouncedValue = useDebounce(keyword, 3);
const query = useQuery(
  ["user-searched", token, debouncedValue],
  () => getUserByNameOrEmail(debouncedValue, token),
  {
    enabled: debouncedValue.length > 2,
    // select: (repos) =>
    //   repos.filter((repo: RepoType) =>
    //     repo.name.toLowerCase().includes(keyword.toLowerCase())
    //   ),
  }
);
const results = query.data as SearchResult;
return { results, search_query: query };    
}
