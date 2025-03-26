"use server";


interface TopicSearchProps{
    returnUrl: string;  // form data
}


export  async function topicSearch(formState:TopicSearchProps,  formData :FormData):Promise<TopicSearchProps>{

    const term =formData.get('term');
    console.log("🎈🎈🎈 토픽 검색 :", term);
    let returnUrl="/";
    if(!term ||  typeof term !== 'string'){
        //redirect('/');
        return {
            returnUrl,
        }

    }

    //redirect(`/topics/search?term=${term}`);
    returnUrl=`/topics/search?term=${encodeURIComponent(term)}`;
    return {
        returnUrl
    }

}