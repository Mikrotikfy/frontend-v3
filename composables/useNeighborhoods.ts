const pagination = ref<Pagination>({
  page: 1,
  pageSize: 500,
  pageCount: 0,
  total: 0,
})
export default function (runtimeConfig: any, token: any) {
  const {data: neighborhoods} = useFetch<strapiDataNeighborhoods>(() => `
    ${runtimeConfig.public.apiBase}neighborhoods?pagination[page]=${pagination.value.page}&pagination[pageSize]=${pagination.value.pageSize}
  `, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    lazy: true
  })
  return neighborhoods.value?.data as Neighborhood[]

}