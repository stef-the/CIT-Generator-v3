<script>
import { validate_each_argument } from "svelte/internal";


	const inputs = [
		{
			name: "iname",
			title: "Internal Name",
			placeholder: "END_SWORD"
		},
		{
			name: "txname",
			title: "Texture Name",
			placeholder: "texture.png"
		},
		{
			name: "fname",
			title: "File Name",
			placeholder: "texture.properties"
		}
	]
	function download(data, filename, type) {
		var file = new Blob([data], { type: type });
		if (window.navigator.msSaveOrOpenBlob)
			// IE10+
			window.navigator.msSaveOrOpenBlob(file, filename);
		else {
			// Others
			var a = document.createElement("a"),
				url = URL.createObjectURL(file);
			a.href = url;
			a.download = filename;
			document.body.appendChild(a);
			a.click();
			setTimeout(function () {
				document.body.removeChild(a);
				window.URL.revokeObjectURL(url);
			}, 0);
		}
	}

	async function createProperties(internalname) {
		const response = await fetch(
			`https://raw.githubusercontent.com/NotEnoughUpdates/NotEnoughUpdates-REPO/master/items/${internalname}.json`,
			{ method: "GET" }
		);

		const data = await response.json();
		console.log(data);
		//download("e", "main.properties", "plain/text");
		return data;
	}
	let out = { displayname: "" };
</script>

<main>
	<h1 class="box-inner">
		<a class="linkto" href="/">Item CIT Generator</a>
	</h1>
	<div class="linebreak" />
	<form autocomplete="off">
		<div class="labelcontainer">
			{#each inputs as item}
				<div class="labelgroup">
					<label for="{item.name}">{item.title}</label>
					<div class="linebreak"></div>
					<input
						class="text"
						type="text"
						name="{item.name}"
						id="{item.name}"
						placeholder="{item.placeholder}"
					/><br />
				</div>
			{/each}
		</div>
		<div class="linebreak" />
		<div class="labelgroup submit">
			<input
				class="submit"
				type="button"
				name="submit"
				value="Submit"
				on:click={() =>
					createProperties(
						document.getElementById("iname").value
					).then((result) => {
						out = result;
						alert(JSON.stringify(out));
						const re = `texture=${document.getElementById("txname").value}\ntype=item\nitems=${result.itemid}\nnbt.ExtraAttributes.id=${document.getElementById("iname").value}`;
						download(re, document.getElementById("fname").value, "text");
					})}
			/>
		</div>
		<p>{out.displayname}</p>
	</form>
</main>
