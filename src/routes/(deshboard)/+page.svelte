<script>
	import { enhance } from '$app/forms';
	export let data;
	$: user = JSON.parse(data.user);
</script>

<svelte:head>
	<title>Deshboard | Home</title>
</svelte:head>

<header>
	<div class="header">
		<strong>hello {user?.firstName + ' ' + user?.lastName}</strong>
		<img src={user?.image} alt="user" />
		<form method="post" use:enhance>
			<button formaction="?/logout">logout</button>
		</form>
	</div>
	{#if !user?.isVerified}
		<div class="label">
			<p>{data.message}</p>
		</div>
	{/if}
	{#if user?.isVerified}
		<h1>i am verifed</h1>
	{/if}
</header>

<h1>Deshboard</h1>

<style>
	header .header {
		padding: 1rem;
		background-color: #00a6fb;
		color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	header .header button {
		padding: 0.8rem;
		border: none;
		outline: none;
		color: white;
		background-color: #046596;
		border-radius: 5px;
		cursor: pointer;
	}
	header .label {
		background-color: #046596;
		text-align: center;
		color: white;
		padding: 1rem;
	}
</style>
