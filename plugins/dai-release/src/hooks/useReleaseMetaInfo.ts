import {useEffect} from "react";

export function useGetReleaseMetaInfo( setMetaInfo: (metaInfo: any | undefined) => void, sourcePage: string) {
  useEffect(() => {
    if(sourcePage !== 'release') {
      return
    }
    setMetaInfo({} as any);
  }, [ setMetaInfo, sourcePage]);
}
