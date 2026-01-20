
export interface DataItem {
  id: string;
  label: string;
  value: number;
  status: 'Active' | 'Pending' | 'Archived' | 'Critical';
  description: string;
  lastUpdated: string;
}

const STATUSES: DataItem['status'][] = ['Active', 'Pending', 'Archived', 'Critical'];

const generateString = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const generateData = (count: number): DataItem[] => {
  console.time('generateData');
  const data: DataItem[] = [];
  for (let i = 0; i < count; i++) {
    data.push({
      id: `row-${i}-${Date.now()}`,
      label: `Item ${i}`,
      value: Math.floor(Math.random() * 10000),
      status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
      description: generateString(20 + Math.floor(Math.random() * 30)),
      lastUpdated: new Date().toISOString()
    });
  }
  console.timeEnd('generateData');
  return data;
};

// Intentionally expensive calculation for Unoptimized mode
export const calculateExpensiveTree = (data: DataItem[]) => {
    // Simulate N^2 complexity or heavy work
    let result = 0;
    // We only process a subset to avoid crashing the browser completely if N is 100k, 
    // but enough to cause lag.
    // For 100k rows, N^2 is 10^10, which is too much.
    // Let's do a heavy loop on the visible or a subset.
    // Or just a heavy O(N) with complex math.
    
    // O(N * 100)
    for (const item of data) {
        for(let j = 0; j < 100; j++) {
            result += Math.sqrt(item.value + j);
        }
    }
    return result;
};
