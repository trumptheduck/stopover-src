export interface Post {
    _id?: string,
    title: string,
    subtitle: string,
    content: string,
    likes: string[],
    views: number,
    comments: any[],
    timestamp: string,
    thumbnail: string,
    images?: string[],
    category?: string,
    isPublished: boolean,
    author: string
}