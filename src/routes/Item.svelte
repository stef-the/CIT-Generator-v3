<script>
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
		let output;

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
			<div class="labelgroup">
				<label for="iname">Internal Name</label>
				<div class="linebreak" />
				<input
					class="text"
					type="text"
					name="iname"
					id="iname"
					placeholder="END_SWORD"
				/><br />
			</div>
			<div class="labelgroup">
				<label for="mcname">Minecraft Name</label>
				<div class="linebreak" />
				<input
					class="text"
					type="text"
					name="mcname"
					id="mcname"
					placeholder="minecraft:diamond_sword"
				/><br />
			</div>
			<div class="labelgroup">
				<label for="txname">Texture Name</label>
				<div class="linebreak" />
				<input
					class="text"
					type="text"
					name="txname"
					id="txname"
					placeholder="texture.png"
				/><br />
			</div>
		</div>
		<div class="linebreak" />
		<div class="labelgroup submit">
			<input
				class="submit"
				type="submit"
				name="submit"
				on:click={() =>
					createProperties(
						document.getElementById("mcname").value
					).then((result) => {
						out = result;
						alert(JSON.stringify(out));
						const re = `
                            texture=${document.getElementById("txname").value}
                            type=item
                            items=
                            `;
						alert(re);
					})}
			/>
		</div>
		<p>{out.displayname}</p>
	</form>
</main>
