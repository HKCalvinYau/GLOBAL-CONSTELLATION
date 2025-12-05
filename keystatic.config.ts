import { config, fields, collection } from '@keystatic/core';

// 根據環境變數選擇存儲方式
// 如果設置了 GitHub 環境變數，使用 GitHub 存儲；否則使用本地存儲
const getStorage = () => {
  // 在 Astro 中，環境變數通過 import.meta.env 訪問
  // 在 Cloudflare Pages 中，環境變數需要通過 import.meta.env 訪問
  const owner = import.meta.env.KEYSTATIC_GITHUB_OWNER;
  const repo = import.meta.env.KEYSTATIC_GITHUB_REPO;
  const token = import.meta.env.KEYSTATIC_GITHUB_TOKEN;
  
  if (owner && repo) {
    const storage: any = {
      kind: 'github' as const,
      repo: {
        owner,
        name: repo,
      },
    };
    
    // 如果提供了 token，添加到配置中
    if (token) {
      storage.repo.token = token;
    }
    
    return storage;
  }
  
  return {
    kind: 'local' as const, // 使用本地文件系統（適合開發和測試）
  };
};

const keystaticConfig = config({
  storage: getStorage(),
  collections: {
    // 標籤管理集合
    tags: collection({
      label: '標籤',
      path: 'src/content/tags/*',
      slugField: 'displayName',
      schema: {
        displayName: fields.text({
          label: '標籤名稱',
          description: '標籤的顯示名稱（會自動生成 URL 友好的 slug）',
          validation: {
            length: {
              min: 1,
            },
          },
        }),
        description: fields.text({
          label: '描述',
          multiline: true,
          description: '標籤的描述（可選）',
        }),
      },
    }),
    
    // 分類管理集合
    categories: collection({
      label: '分類',
      path: 'src/content/categories/*',
      slugField: 'displayName',
      schema: {
        displayName: fields.text({
          label: '分類名稱',
          description: '分類的顯示名稱（會自動生成 URL 友好的 slug）',
          validation: {
            length: {
              min: 1,
            },
          },
        }),
        description: fields.text({
          label: '描述',
          multiline: true,
          description: '分類的描述（可選）',
        }),
        color: fields.select({
          label: '顏色',
          description: '選擇分類的顏色（從色板中選擇）',
          options: [
            { label: '藍色 (Indigo)', value: '#3B82F6' },
            { label: '紫色 (Purple)', value: '#8B5CF6' },
            { label: '粉紅色 (Pink)', value: '#EC4899' },
            { label: '紅色 (Red)', value: '#EF4444' },
            { label: '橙色 (Orange)', value: '#F97316' },
            { label: '黃色 (Amber)', value: '#F59E0B' },
            { label: '綠色 (Green)', value: '#10B981' },
            { label: '青色 (Cyan)', value: '#06B6D4' },
            { label: '深藍 (Blue)', value: '#2563EB' },
            { label: '深紫 (Violet)', value: '#7C3AED' },
            { label: '深綠 (Emerald)', value: '#059669' },
            { label: '深灰 (Slate)', value: '#64748B' },
          ],
          defaultValue: '#3B82F6',
        }),
      },
    }),
    
    // 文章集合
    posts: collection({
      label: '文章',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({
          label: '標題',
          validation: {
            length: {
              min: 1,
            },
          },
        }),
        publishedDate: fields.date({
          label: '發布日期',
          defaultValue: { kind: 'today' },
        }),
        coverImage: fields.image({
          label: '封面圖片',
          directory: 'public/images/posts',
          publicPath: '/images/posts',
        }),
        excerpt: fields.text({
          label: '摘要',
          multiline: true,
          description: '文章摘要，用於列表頁顯示',
        }),
        // 閱讀量
        views: fields.integer({
          label: '閱讀量',
          description: '文章閱讀次數',
          defaultValue: 0,
          validation: {
            min: 0,
          },
        }),
        // 推介（推薦文章）
        featured: fields.checkbox({
          label: '推介',
          description: '標記為推薦文章，會在列表頁顯示👍圖標',
          defaultValue: false,
        }),
        // 標籤（多選）
        tags: fields.array(
          fields.relationship({
            label: '標籤',
            collection: 'tags',
          }),
          {
            label: '標籤',
            description: '選擇文章的標籤（可多選）',
            itemLabel: (item) => item?.value || '未命名標籤',
          }
        ),
        // 分類（單選）
        category: fields.relationship({
          label: '分類',
          collection: 'categories',
          description: '選擇文章的分類',
        }),
        content: fields.document({
          label: '內容',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images/posts',
            publicPath: '/images/posts',
          },
          tables: true,
        }),
      },
    }),
    
    // 相片庫集合
    gallery: collection({
      label: '相片庫',
      path: 'src/content/gallery/*',
      slugField: 'title',
      schema: {
        title: fields.text({
          label: '標題',
          description: '相片的標題（可選）',
        }),
        image: fields.image({
          label: '相片',
          directory: 'public/images/gallery',
          publicPath: '/images/gallery',
        }),
        order: fields.text({
          label: '排序',
          description: '排序順序（例如：01, 02, 03），數字越小越靠前',
          defaultValue: '99',
        }),
        description: fields.text({
          label: '描述',
          multiline: true,
          description: '相片的描述（可選）',
        }),
      },
    }),
    
    // 學員見證集合
    testimonials: collection({
      label: '學員見證',
      path: 'src/content/testimonials/*',
      slugField: 'name',
      schema: {
        name: fields.text({
          label: '學員姓名',
          validation: {
            length: {
              min: 1,
            },
          },
        }),
        publishedDate: fields.date({
          label: '發布日期',
          defaultValue: { kind: 'today' },
        }),
        coverImage: fields.image({
          label: '相片',
          directory: 'public/images/testimonials',
          publicPath: '/images/testimonials',
        }),
        excerpt: fields.text({
          label: '見證摘要',
          multiline: true,
          description: '見證的摘要，用於列表頁顯示',
        }),
        rating: fields.integer({
          label: '評分',
          description: '評分（1-5星）',
          defaultValue: 5,
          validation: {
            min: 1,
            max: 5,
          },
        }),
        order: fields.text({
          label: '排序',
          description: '排序順序（例如：01, 02, 03），數字越小越靠前',
          defaultValue: '99',
        }),
        content: fields.document({
          label: '見證內容',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images/testimonials',
            publicPath: '/images/testimonials',
          },
        }),
      },
    }),
  },
});

// 導出配置供 Keystatic UI 使用
export default keystaticConfig;

