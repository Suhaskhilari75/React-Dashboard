'use client';
import { useSearchParams ,usePathname,useRouter} from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {useDebouncedCallback} from 'use-debounce'

export default function Search({ placeholder }: { placeholder: string }) {
  const searchparams=useSearchParams();
  const pathname=usePathname();
  const {replace}=useRouter();

  const handleSearch=useDebouncedCallback((term:string)=>{
    console.log(`Searching... ${term}`);
    // URLSearchParams is a Web API that provides utility methods for manipulating the URL query parameters. 
    // Instead of creating a complex string literal, you can use it to get the params string like
    // ===> ?page=1&query=a.
    const params=new URLSearchParams (searchparams);
    params.set('page', '1');
    term?params.set('query',term):params.delete('query')
    replace(`${pathname}?${params.toString()}`)
  },300)
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
      defaultValue={searchparams.get('query')?.toString()}
      onChange={(e)=>handleSearch(e.target.value)}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
