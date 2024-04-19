interface ISource {
    id:string,
    name:string
}

export interface IArticle {
    id: number,
    source: ISource,
    author:string,
    title: string,
    description: string,
    url: string;
    urlToImage: string,
    publishedAt: Date,
    content: string
}

