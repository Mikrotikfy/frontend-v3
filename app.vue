<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
<style>
/* WebKit */
::-webkit-scrollbar {
  width: 3px;
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background-color: #888;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #868686;
}

::-webkit-scrollbar-corner {
  background-color: #f1f1f1;
}

/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
	transform: translateX(0);
	opacity: 1;
}
</style>