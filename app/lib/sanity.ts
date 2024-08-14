import { createClient } from 'next-sanity';
import ImageUrlBuilder from '@sanity/image-url';
import { type QueryParams } from '@sanity/client';

export const client = createClient({
    projectId: '0y0vhapr',
    dataset: 'production',
    apiVersion: '2022-03-07',
    useCdn: false,  // Đảm bảo không dùng CDN để luôn lấy dữ liệu mới nhất
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source: any) => {
    return builder.image(source);
}

// Tạo hàm sanityFetch để hỗ trợ tái xác thực cache
export async function sanityFetch<QueryResponse>({
  query,
  qParams = {},
  tags,
}: {
  query: string;
  qParams?: QueryParams;
  tags: string[];
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, qParams, {
    cache: "force-cache", // Buộc tái xác thực cache nếu có thay đổi
    next: { tags },
  });
}
