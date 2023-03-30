<template>
	<div>
		<VApp>
			<VMain
        class="red"
        style=""
      >
				<slot />
			</VMain>
		</VApp>
	</div>
</template>

<style>
  body {
    background-color: red;
    overflow: hidden;
  }
</style>