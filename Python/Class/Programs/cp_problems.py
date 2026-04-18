class Solution:
    def swap_adjacent(self, arr : list[int]) -> list[int]:
        for idx in range(len(arr)):
            if idx % 2 == 1:
                arr[idx], arr[idx - 1] = arr[idx - 1], arr[idx]

        return arr
    
    def find_insert_position(self, arr: list[int], k: int) -> int:
        # for idx in range(len(arr)):
        #     if arr[idx] == k:
        #         return idx
        #     elif arr[idx] > k:
        #         return idx
            
        # return len(arr)

        # Approach 2: Binary Search

        low = 0
        high = len(arr) - 1

        while low <= high:
            mid = (low + high) // 2

            if arr[mid] == k:
                return mid
            elif arr[mid] < k:
                low = mid + 1
            else:
                high = mid - 1

        return low
    
    def count_digit(self, n: int) -> int:
        if n == 0:
            return 1

        n = abs(n)
        count = 0

        while n > 0:
            count += 1
            n //= 10

        return count


solution = Solution()
arr = [1, 3, 5, 6]
print(solution.find_insert_position(arr, 2))