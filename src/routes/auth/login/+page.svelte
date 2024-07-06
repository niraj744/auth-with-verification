<script>
	import { superForm } from 'sveltekit-superforms';
	export let data;
	const { form, errors, message, enhance, delayed } = superForm(data.form);
	import { toast } from 'svoast';

	if (data?.message) {
		toast.success(data.message);
	}
	$: if ($message) {
		toast.success($message);
	}
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="registerContainer">
	<div class="wrapper">
		<div class="heading">
			<h1>Login</h1>
			<p>welcome back</p>
		</div>
		<form method="post" use:enhance>
			<input
				type="email"
				name="email"
				placeholder="enter your email address"
				bind:value={$form.email}
			/>
			{#if $errors.email}
				<span>{$errors.email}</span>
			{/if}
			<input
				type="password"
				name="password"
				placeholder="enter your password"
				bind:value={$form.password}
			/>
			{#if $errors.password}
				<span>{$errors.password}</span>
			{/if}
			{#if $delayed}
				<button type="submit" style="pointer-events: none; opacity: 0.7;">loading...</button>
			{:else}
				<button type="submit">submit</button>
			{/if}
		</form>
		<p>don't have an account ? <a href="/auth/register">register</a></p>
	</div>
</div>

<style lang="scss">
	.registerContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		background: rgb(221, 221, 221);
		.wrapper {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			text-align: center;
			padding: 2rem;
			width: 100%;
			max-width: 400px;
			background: rgb(241, 241, 241);
			border-radius: 10px;
			.heading {
				display: flex;
				flex-direction: column;
				gap: 10px;
				align-items: center;
				p {
					color: grey;
				}
			}
			form {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 1rem;
				input {
					width: 100%;
					padding: 1rem;
					border: none;
					outline: none;
					border-radius: 5px;
				}
				button {
					width: 100%;
					padding: 0.8rem;
					background-color: #8338ec;
					color: white;
					border: none;
					outline: none;
					border-radius: 5px;
					cursor: pointer;
					transition: all 0.5s;
					&:hover {
						background-color: #7532d3;
					}
				}
				span {
					color: #e63946;
					font-size: 15px;
				}
			}
		}
	}
</style>
