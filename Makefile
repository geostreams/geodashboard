cleanup_node:
	find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +

cleanup_locks:
	find . -name 'package-lock.json' -prune -exec rm -rf '{}' +

clean: cleanup_node cleanup_locks
