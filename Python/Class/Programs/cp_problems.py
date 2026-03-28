class Solution:
    def swap_adjacent(self, arr : list) -> list:
        for idx in range(len(arr)):
            if idx % 2 == 1:
                arr[idx], arr[idx - 1] = arr[idx - 1], arr[idx]

        return arr


solution = Solution()
arr = [20, 10, 40, 30, 60, 50]
print(solution.swap_adjacent(arr))